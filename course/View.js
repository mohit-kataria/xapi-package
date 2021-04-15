var View = {
  updateElements: function (container, innerElements) {
    //alert(innerElements);
    sljQ("#" + container).html(innerElements);
    if (container == "coursemap") {
      sljQ("#coursemap")
        .jScrollPane({ showArrows: true, scrollbarWidth: 15, arrowSize: 12 })
        .addTouch();
    }
  },
};
