const amanha = () => {
  const tmp = new Date();
  tmp.setDate(tmp.getDate() + 1);
  return tmp;
};

const proximaSexta = () => {
  const tmp = new Date();
  tmp.setDate(tmp.getDate() + ((((7 - tmp.getDay()) % 7) + 4) % 7));
  tmp.setHours(18);
  tmp.setMinutes(0);
  tmp.setSeconds(0);
  tmp.setMilliseconds(0);
  return tmp;
};

const proximoDomingo = () => {
  const tmp = new Date();
  tmp.setDate(tmp.getDate() + ((((7 - tmp.getDay()) % 7) + 6) % 7));
  tmp.setHours(18);
  tmp.setMinutes(0);
  tmp.setSeconds(0);
  tmp.setMilliseconds(0);
  return tmp;
};

module.exports = {
  amanha,
  proximaSexta,
  proximoDomingo,
};
