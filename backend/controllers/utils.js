const amanha = () => {
  const tmp = new Date();
  tmp.setDate(tmp.getDate() + 1);
  return tmp;
};

const proximaSexta = () => {
  const tmp = new Date();
  tmp.setDate(tmp.getDate() + ((((7 - tmp.getDay()) % 7) + 4) % 7));
  tmp.setUTCHours(18);
  tmp.setUTCMinutes(0);
  tmp.setUTCSeconds(0);
  tmp.setUTCMilliseconds(0);
  return tmp;
};

const proximoDomingo = () => {
  const tmp = new Date();
  tmp.setDate(tmp.getDate() + ((((7 - tmp.getDay()) % 7) + 6) % 7));
  tmp.setUTCHours(18);
  tmp.setUTCMinutes(0);
  tmp.setUTCSeconds(0);
  tmp.setUTCMilliseconds(0);
  return tmp;
};

module.exports = {
  amanha,
  proximaSexta,
  proximoDomingo,
};
