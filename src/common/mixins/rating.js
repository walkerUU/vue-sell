const ALL = 2;
export default {
  data() {
    return {
      onlyContent: true,
      selectType: ALL
    };
  },
  computed: {
    computedRatings() {
      const res = [];
      this.ratings.forEach(rating => {
        if (this.onlyContent && !rating.text) {
          return;
        }
        if (this.selectType === ALL || this.selectType === rating.rateType) {
          res.push(rating);
        }
      });
      return res;
    }
  },
  methods: {
    onSelectType(type) {
      this.selectType = type;
    },
    onToggle() {
      this.onlyContent = !this.onlyContent;
    }
  }
};
