import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

class ReactToPrint extends React.Component {
    static propTypes = {
        /** Copy styles over into print window. default: true */
        copyStyles: PropTypes.bool,
        /** Trigger action used to open browser print */
        trigger: PropTypes.func.isRequired,
        /** Content to be printed */
        content: PropTypes.func.isRequired,
        /** Callback function to trigger before print */
        onBeforePrint: PropTypes.func,
        /** Callback function to trigger after print */
        onAfterPrint: PropTypes.func,
        /** Override default print window styling */
        pageStyle: PropTypes.string,
        /** Optional class to pass to the print window body */
        bodyClass: PropTypes.string
    };

    static defaultProps = {
        bodyClass: '',
        copyStyles: true,
        onAfterPrint: undefined,
        onBeforePrint: undefined,
        pageStyle: undefined
    };

    // 인쇄 취소
    removeWindow = target => {
        setTimeout(() => {
            target.parentNode.removeChild(target);
        }, 500);
    };

    // 인쇄 버튼 클릭시
    triggerPrint = target => {
        const { onBeforePrint, onAfterPrint } = this.props;

        if (onBeforePrint) {
            onBeforePrint();
        }

        setTimeout(() => {
            target.contentWindow.focus();
            target.contentWindow.print();
            this.removeWindow(target);

            if (onAfterPrint) {
                onAfterPrint();
            }
        }, 500);
    };

    // 인쇄 초기화
    handlePrint = () => {
        const { bodyClass, content, copyStyles, pageStyle } = this.props;

        // ref : Dom에 직접 접근
        const contentEl = content();

        if (contentEl === undefined) {
            console.error(
                'stateless components에서는 Ref를 사용할 수 없습니다. 클래스 기반 컴포넌트에서만 프린트가 가능합니다.'
            );
            return;
        }

        // iframe을 생성한다.
        const printWindow = document.createElement('iframe');

        // iframe을 사용하는 이유에 대해서 명시를 할 필요가 있음
        printWindow.style.position = 'absolute';
        printWindow.style.top = '1000px';
        printWindow.style.left = '1000px';

        // DomNode를 찾아서 가져옴
        const contentNodes = findDOMNode(contentEl);
        //관련 CSS들을 가져옴
        const linkNodes = document.querySelectorAll('link[rel="stylesheet"]');

        this.linkTotal = linkNodes.length || 0;
        this.linksLoaded = [];
        this.linksErrored = [];

        // CSS 로딩해서 로딩된 것과 실패한 것을 구분하는 부분
        const markLoaded = (linkNode, loaded) => {
            if (loaded) {
                this.linksLoaded.push(linkNode);
            } else {
                console.error(
                    "'react-print' was unable to load a link. It may be invalid. 'react-print' will continue attempting to print the page. The link the errored was:",
                    linkNode
                );
                this.linksErrored.push(linkNode);
            }

            if (this.linksLoaded.length + this.linksErrored.length === this.linkTotal) {
                // 최종적으로 만들어진 iframe을 넘김
                this.triggerPrint(printWindow);
            }
        };

        // iframe이 onload되는 시점  즉 다 그려진 시점이라고 생각하면 될 듯
        printWindow.onload = () => {
            /* IE11 support */
            if (window.navigator && window.navigator.userAgent.indexOf('Trident/7.0') > -1) {
                printWindow.onload = null;
            }

            // iframe내부 Dom을 가져옴
            const domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
            const srcCanvasEls = [...contentNodes.querySelectorAll('canvas')];

            domDoc.open();
            // ref 참조한 것을 그림
            // outerHTML : Element를 String으로 뽑아내줌
            domDoc.write(contentNodes.outerHTML);
            domDoc.close();
            // iframe에 ref Element를 그려넣음

            /* remove date/time from top <= 안먹음*/
            // Default Style margin 수정진행
            const defaultPageStyle =
                pageStyle === undefined
                    ? '@page { size: auto;  margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }'
                    : pageStyle;

            const styleEl = domDoc.createElement('style');

            // 동적으로 TextNode추가
            // 즉 style Elemnt에 자식으로 defaultPageStyle 추가
            /**
             *<style>
             * @page { size: auto;  margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }
             *</style>
             */
            styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));

            // 만든 style Element를 Head에 추가
            domDoc.head.appendChild(styleEl);

            // body에 클래스 추가
            if (bodyClass.length) {
                domDoc.body.classList.add(bodyClass);
            }

            // 이건 왜있는 것인지
            // const canvasEls = domDoc.querySelectorAll('canvas');

            // [...canvasEls].forEach((node, index) => {
            //     node.getContext('2d').drawImage(srcCanvasEls[index], 0, 0);
            // });

            if (copyStyles !== false) {
                const headEls = document.querySelectorAll('style, link[rel="stylesheet"]');
                console.log(headEls);

                [...headEls].forEach((node, index) => {
                    if (node.tagName === 'STYLE') {
                        // <style></style> 생성
                        const newHeadEl = domDoc.createElement(node.tagName);

                        if (node.sheet) {
                            let styleCSS = '';

                            for (let i = 0; i < node.sheet.cssRules.length; i++) {
                                // String으로 변환
                                styleCSS += `${node.sheet.cssRules[i].cssText}\r\n`;
                            }

                            newHeadEl.setAttribute('id', `react-print-${index}`);
                            newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
                            // 헤더에 추가
                            domDoc.head.appendChild(newHeadEl);
                        }
                    } else {
                        const attributes = [...node.attributes];

                        const hrefAttr = attributes.filter(attr => attr.nodeName === 'href');
                        const hasHref = hrefAttr.length ? !!hrefAttr[0].nodeValue : false;

                        // Many browsers will do all sorts of weird things if they encounter an empty `href`
                        // tag (which is invalid HTML). Some will attempt to load the current page. Some will
                        // attempt to load the page's parent directory. These problems can cause
                        // `react-to-print` to stop  without any error being thrown. To avoid such problems we
                        // simply do not attempt to load these links.
                        if (hasHref) {
                            const newHeadEl = domDoc.createElement(node.tagName);

                            attributes.forEach(attr => {
                                newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
                            });

                            newHeadEl.onload = markLoaded.bind(null, newHeadEl, true);
                            newHeadEl.onerror = markLoaded.bind(null, newHeadEl, false);
                            console.log(newHeadEl);
                            domDoc.head.appendChild(newHeadEl);
                        } else {
                            console.warn(
                                "'react-print' encountered a <link> tag with an empty 'href' attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:",
                                node
                            ); // eslint-disable-line no-console
                            markLoaded(node, true); // `true` because we've already shown a warning for this
                        }
                    }
                });
            }

            if (this.linkTotal === 0 || copyStyles === false) {
                this.triggerPrint(printWindow);
            }
        };

        document.body.appendChild(printWindow);
    };

    setRef = ref => {
        this.triggerRef = ref;
    };

    render() {
        const { trigger } = this.props;

        return React.cloneElement(trigger(), {
            onClick: this.handlePrint,
            ref: this.setRef
        });
    }
}

export default ReactToPrint;
