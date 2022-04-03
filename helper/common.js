class Common {
  /**
   * Returns unique Id
   * Lengtth- 18
   */
  getuniqueId = async () => {
    function VPID() {
      return (((1 + Math.random()) * 0x1000) | 0).toString(16).substring(1);
    }
    return (
      VPID() +
      VPID() +
      VPID() +
      VPID() +
      VPID() +
      VPID() +
      VPID()
    ).toLowerCase();
  };
}

const common = new Common();
module.exports = common;
