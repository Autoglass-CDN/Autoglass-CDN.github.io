const sections = [...document.querySelectorAll("section")];
const getLinkById = (id) => document.querySelector(`a[href='#${id}']`);

const inView = (section, width) => {
  let top = section.offsetTop;
  //offsetTop: Distance of the outer border of the current element relative to the inner border of the top of the offsetParent node.
  let height = section.offsetHeight;
  //offsetHeight: height of an element, including vertical padding and borders, as an integer.

  while (section.offsetParent) {
    //offsetParent: a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element.
    section = section.offsetParent;
    top += section.offsetTop;
  }
  if (width) { //adiciona margem do topo no cálculo
    top -= width > 1200 ? 165 : 130;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    top + height > window.pageYOffset
  );
  //pageYOffset: the number of pixels the document is currently scrolled along the vertical axis (that is, up or down) with a value of 0.0, indicating that the top edge of the Document is currently aligned with the top edge of the window's content area.
  //innerHeight: the interior height of the window in pixels, including the height of the horizontal scroll bar, if present.
};

window.onscroll = () => {
  let next = false;

  sections.forEach((section) => {
    const a = getLinkById(section.id);

    if (inView(section, window.innerWidth) && !next) {
      a.classList.add("tab--current");
      next = true;
    } else {
      a && a.classList.remove("tab--current");
    }
  });
};

const toggleSectionCollapse = (section) => {
  if (section.classList.contains('ativo'))
    section.classList.remove('ativo');
  else
    section.classList.add('ativo');
};

const sectionCollapseInit = () => {
  let sections = document.querySelectorAll('.contents .tab-content h2');

  sections.forEach(section => {
    section.onclick = (event) => {
      toggleSectionCollapse(section.parentElement);
    };
  })
};

sectionCollapseInit();