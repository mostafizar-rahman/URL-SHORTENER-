const getIdLocalStroge = () => {
  const uuId = localStorage.getItem("uuId");
  return uuId;
};

const setIdLocalStroge = () => {
  if (getIdLocalStroge() === "null") {
    const id = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("uuId", id);
  } else {
    const id = getIdLocalStroge();
    localStorage.setItem("uuId", id);
  }
};

export { setIdLocalStroge, getIdLocalStroge };
