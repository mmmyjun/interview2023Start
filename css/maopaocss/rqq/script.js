class ArrSort {
    root = document.createElement('ul');
    itemMap = new Map();
    itemSize = 80;
    outerWidth = 10;
  
    constructor(list) {
      this.list = list;
      this.initDom();
    }
  
    setStyles(elm, styles) {
      Object.entries(styles).map(([property, value]) =>
        elm.style.setProperty(property, value)
      );
    }
  
    initDom() {
      this.setStyles(this.root, {
        position: 'relative',
        background: 'cyan',
        width: this.itemSize * this.list.length + 'px',
        height: this.itemSize + 'px',
        padding: 0,
      });
      for (let i = 0; i < this.list.length; i++) {
        const listItem = document.createElement('li');
        const inner = document.createElement('div');
        inner.innerText = this.list[i];
        this.setStyles(inner, {
          width: '100%',
          height: '100%',
          'text-align': 'center',
          'line-height': this.itemSize - this.outerWidth * 2 + 'px',
          background: 'orange',
        });
        this.setStyles(listItem, {
          position: 'absolute',
          top: 0,
          left: i * this.itemSize + 'px',
          width: this.itemSize + 'px',
          height: this.itemSize + 'px',
          padding: this.outerWidth + 'px',
          transition: 'all 1s',
          'list-style': 'none',
        });
        listItem.appendChild(inner);
        this.itemMap.set(i, listItem);
        this.root.appendChild(listItem);
      }
    }
  
    mount(elm) {
      elm.appendChild(this.root);
    }
  
    sleep(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }
  
    async sort() {
      let list = [...this.list];
      for (let i = 0, len = list.length; i < len - 1; i++) {
        let sorted = true;
        for (let j = 0; j < len - i - 1; j++) {
          if (list[j] > list[j + 1]) {
            await this.sleep(1e3);
            let tmp = list[j];
            let tempElm;
            list[j] = list[j + 1];
            list[j + 1] = tmp;
            sorted = false;
            this.setStyles(this.itemMap.get(j), {
              left: this.itemSize * (j + 1) + 'px',
            });
            this.setStyles(this.itemMap.get(j + 1), {
              left: this.itemSize * j + 'px',
            });
            tempElm = this.itemMap.get(j);
            this.itemMap.set(j, this.itemMap.get(j + 1));
            this.itemMap.set(j + 1, tempElm);
          }
        }
        if (sorted) {
          break;
        }
      }
      return list;
    }
  }
  
  window.onload = async () => {
    // const arrSort = new ArrSort([4, 2, 1, 3, 6, 8, 5, 7]);
    const arrSort = new ArrSort([8, 3, 7, 1]);
    arrSort.mount(document.querySelector('#root'));
    const sortResult = await arrSort.sort();
    console.log('result:', sortResult);
  };
  