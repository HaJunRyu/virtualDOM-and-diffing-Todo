const isNodeChanged = (node1: Element, node2: Element) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  const differentAttribute = Array.from(n1Attributes).find(attribute => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) {
    return true;
  }

  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

const applyDiff = (parentNode: Element, realNode: Element, virtualNode: Element): void => {
  // 실제돔에는 존재하지만 가상돔에는 존재하지 않는다면 실제돔을 삭제
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  // 실제돔에는 없지만 가상돔에는 있다면 생성
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // 노드의 속성 및 자식요소가 변경됐다면 실제돔 수정
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
