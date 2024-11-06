(function(blocks) {
    blocks.registerBlockType('pg-image-carousel/image-carousel', {
      title: 'Custom Image Carousel',
      icon: 'format-gallery',
      category: 'common',
      attributes: {
        _imgPairity: { type: 'boolean', default: false },
        img1Index: { type: 'number', default: 0 },
        img2Index: { type: 'number', default: 1 },
        imageUrls: { type: 'array', default: [] },
        imgageCaptions: { type: 'array', default: [] },
        autoScroll: { type: 'boolean' },
        autoScrollTime: { type: 'number'},
        backgroundColor: { type: 'string', default: '#ffffff' },
        aspectRatio: { type: 'string', default: '62.5%' },
        testFunction: { type: 'string', default: (() => {alert('test')}).toString() }
      },
      edit: function(props) {
  
        let stepForward = (event) => {
          if (props.attributes.imageUrls.length > 1) {
            if (!props.attributes._imgPairity) {
              props.setAttributes({
                img2Index: (props.attributes.img1Index + 1) % props.attributes.imageUrls.length,
                _imgPairity: !props.attributes._imgPairity
              });
            } else {
              props.setAttributes({
                img1Index: (props.attributes.img2Index + 1) % props.attributes.imageUrls.length,
                _imgPairity: !props.attributes._imgPairity
              });
            }
          }
        }
        let stepBack = (event) => {
          if (props.attributes.imageUrls.length > 1) {
            if (!props.attributes._imgPairity) {
              props.setAttributes({
                img2Index: (props.attributes.img1Index + props.attributes.imageUrls.length - 1) % props.attributes.imageUrls.length,
                _imgPairity: !props.attributes._imgPairity
              });
            } else {
              props.setAttributes({
                img1Index: (props.attributes.img2Index + props.attributes.imageUrls.length - 1) % props.attributes.imageUrls.length,
                _imgPairity: !props.attributes._imgPairity
              });
            }
          }
        }
        let setIndex = (i) => {
          if (props.attributes.imageUrls.length > 1) {
            if (!((!props.attributes._imgPairity && props.attributes.img1Index === i) || (props.attributes._imgPairity && props.attributes.img2Index === i))) {
              if (!props.attributes._imgPairity) {
                props.setAttributes({
                  img2Index: i,
                  _imgPairity: !props.attributes._imgPairity
                });
              } else {
                props.setAttributes({
                  img1Index: i,
                  _imgPairity: !props.attributes._imgPairity
                });
              }
            }
          }
        }
        function updateBackgroundColor(value) {
          props.setAttributes({
            backgroundColor: value.hex
          });
        }
        function openMediaModal() {
          var frame = new wp.media.view.MediaFrame.Select({
            title: 'Select images for this gallery',
            multiple: true,
            library: {
              order: 'ASC',
              orderby: 'title',
              type: 'image',
              search: null,
              uploadedTo: null
            },
            button: {
              text: 'Accept'
            }
          });
          frame.on('select', () => {
            let ids = [];
            frame.state().get('selection').each(model => {
              //console.log(model.attributes.url);
              ids.push(model.attributes.url);
            });
            props.setAttributes({
              imageUrls: ids,
              _imgPairity: false,
              img1Index: 0,
              img2Index: ids.length? ids.length-1 : 0,
            });
            //console.log(props.attributes);
          });
          frame.open();
        }
        return React.createElement(
          "div",
          null,
          props.attributes.imageUrls &&
            props.attributes.imageUrls.length &&
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                {
                  class: "img-carousel-container",
                  style: {
                    "background-color": props.attributes.backgroundColor,
                    "padding-top": props.attributes.aspectRatio
                  }
                },
                React.createElement("img", {
                  class:
                    "img-carousel-img" +
                    (props.attributes._imgPairity
                      ? " img-carousel-img-transparent"
                      : ""),
                  src: props.attributes.imageUrls[props.attributes.img1Index]
                }),
                React.createElement("img", {
                  class:
                    "img-carousel-img" +
                    (!props.attributes._imgPairity
                      ? " img-carousel-img-transparent"
                      : ""),
                  src: props.attributes.imageUrls[props.attributes.img2Index]
                }),
                React.createElement(
                  "span",
                  {
                    class: "img-carousel-left-arrow",
                    onClick: stepBack
                  },
                  React.createElement("span", {
                    class: "dashicons dashicons-arrow-left-alt2"
                  })
                ),
                React.createElement(
                  "span",
                  {
                    class: "img-carousel-right-arrow",
                    onClick: stepForward
                  },
                  React.createElement("span", {
                    class: "dashicons dashicons-arrow-right-alt2"
                  })
                ),
                React.createElement(
                  "span",
                  {
                    class: "img-carousel-dots-container"
                  },
                  props.attributes.imageUrls.map(function(obj, i) {
                    return React.createElement("div", {
                      class:
                        "img-carousel-dot" +
                        ((i == props.attributes.img1Index &&
                          !props.attributes._imgPairity) ||
                        (i == props.attributes.img2Index &&
                          props.attributes._imgPairity)
                          ? " img-carousel-dot-active"
                          : ""),
                      onClick: function onClick() {
                        return setIndex(i);
                      }
                    });
                  })
                )
              ),
              React.createElement(
                "div",
                {
                  class: "img-carousel-control-panel"
                },
                React.createElement("h3", null, "Choose a background color"),
                React.createElement(wp.components.ColorPicker, {
                  onChangeComplete: updateBackgroundColor,
                  color: props.attributes.backgroundColor
                })
              )
            ),
          React.createElement(
            "button",
            {
              class: "img-carousel-button",
              onClick: openMediaModal
            },
            "Select Images"
          )
        );
      },
      save: function(props) {
        return React.createElement(
          "div",
          null,
          props.attributes.imageUrls &&
            props.attributes.imageUrls.length &&
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                {
                  class: "img-carousel-container",
                  style: {
                    "background-color": props.attributes.backgroundColor,
                    "padding-top": props.attributes.aspectRatio
                  }
                },
                React.createElement(
                  "div",
                  {
                    class: "img-carousel-img-urls"
                  },
                  props.attributes.imageUrls.join()
                ),
                React.createElement(
                  "div",
                  {
                    class: "img-carousel-img-captions"
                  },
                  props.attributes.imgageCaptions.join()
                ),
                React.createElement("img", {
                  class: "img-carousel-img",
                  src: props.attributes.imageUrls[0]
                }),
                React.createElement("img", {
                  class: "img-carousel-img img-carousel-img-transparent",
                  src: props.attributes.imageUrls[props.attributes.imageUrls.length - 1]
                }),
                React.createElement(
                  "span",
                  {
                    class: "img-carousel-left-arrow"
                  },
                  React.createElement("span", {
                    class: "dashicons dashicons-arrow-left-alt2"
                  })
                ),
                React.createElement(
                  "span",
                  {
                    class: "img-carousel-right-arrow"
                  },
                  React.createElement("span", {
                    class: "dashicons dashicons-arrow-right-alt2"
                  })
                ),
                React.createElement(
                  "span",
                  {
                    class: "img-carousel-dots-container"
                  },
                  props.attributes.imageUrls.map(function(obj, i) {
                    return React.createElement("div", {
                      class:
                        "img-carousel-dot" +
                        ((i == props.attributes.img1Index &&
                          !props.attributes._imgPairity) ||
                        (i == props.attributes.img2Index &&
                          props.attributes._imgPairity)
                          ? " img-carousel-dot-active"
                          : "")
                    });
                  })
                ),
                React.createElement("script", null, `
                  (function() {
                    let scripts = document.getElementsByTagName('script');
                    let currentScript = scripts[scripts.length - 1];
                    let props = {
                      imgUrls: null,
                      imgCaptions: null,
                      imgElement1: null,
                      imgElement2: null,
                      leftArrowElement: null,
                      rightArrowElement: null,
                      imgDotElements: null
                    };
                    function setImg(n) {
                      if (props.imgElement1.classList.contains('img-carousel-img-transparent')) {
                        props.imgElement1.src = props.imgUrls[n % props.imgUrls.length];
                      } else {
                        props.imgElement2.src = props.imgUrls[n % props.imgUrls.length];
                      }
                      props.imgElement1.classList.toggle('img-carousel-img-transparent');
                      props.imgElement2.classList.toggle('img-carousel-img-transparent');
                  
                      props.imgDotElements.forEach(dot => {
                        dot.classList.remove('img-carousel-dot-active');
                      });
                      props.imgDotElements[n % props.imgUrls.length].classList.add('img-carousel-dot-active');
                    }
                    [ ... currentScript.parentNode.children].forEach(node => {
                      // image urls list
                      if (node.classList.contains('img-carousel-img-urls')) {
                        props.imgUrls = node.textContent.split(",");
                      }
                      // image captions list
                      if (node.classList.contains('img-carousel-img-captions')) {
                        props.imgCaptions = node.textContent.split(",");
                      }
                      // html image elements
                      if (node.classList.contains('img-carousel-img')) {
                        if (node.classList.contains('img-carousel-img-transparent')) {
                          // image element 2
                          props.imgElement2 = node;
                        } else {
                          // image element 1
                          props.imgElement1 = node;
                        }
                      }
                      // step back button
                      if (node.classList.contains('img-carousel-left-arrow')) {
                        props.leftArrowElement = node; 
                        node.addEventListener('click', () => {
                          if (props.imgElement1.classList.contains('img-carousel-img-transparent')) {
                            setImg(props.imgUrls.indexOf(props.imgElement2.src) + props.imgUrls.length -1);
                          } else {
                            setImg(props.imgUrls.indexOf(props.imgElement1.src) + props.imgUrls.length -1);
                          }
                        });
                      }
                      // step forward button
                      if (node.classList.contains('img-carousel-right-arrow')) {
                        props.rightArrowElement = node;
                        node.addEventListener('click', () => {
                          if (props.imgElement1.classList.contains('img-carousel-img-transparent')) {
                            setImg(props.imgUrls.indexOf(props.imgElement2.src) + 1);
                          } else {
                            setImg(props.imgUrls.indexOf(props.imgElement1.src) + 1);
                          }
                        });
                      }
                      // image dots container
                      if (node.classList.contains('img-carousel-dots-container')) {
                        props.imgDotElements = [];
                        // image dots
                        node.childNodes.forEach((value, key) => {
                          props.imgDotElements.push(value);
                          value.addEventListener('click', (e) => {
                            setImg(key);
                          });
                        });
                      }
                    });
                  })();             
                `)
              )
            )
        );
      }
    });
  })(window.wp.blocks);