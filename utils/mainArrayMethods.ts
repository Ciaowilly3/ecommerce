interface IMyArray {
  myForeach: (callback: (myArrayElement: any) => void) => void;
  myMap: (callback: (myArrayElement: any) => any) => any[];
  myFilter: (callback: (myArrayElement: any) => boolean) => any[];
}

class MyArray implements IMyArray {
  private myArray: any[];

  constructor(initialArray?: Array<any>) {
    this.myArray = initialArray || [];
  }

  set(newArray: any[]) {
    this.myArray = newArray;
  }

  get(): typeof this.myArray {
    return this.myArray;
  }

  myForeach(callback: (myArrayElement: any) => void) {
    for (const element of this.myArray) {
      callback(element);
    }
  }

  myMap(callback: (myArrayElement: any) => any) {
    const modifiedArray = [];
    for (const element of this.myArray) {
      modifiedArray.push(callback(element));
    }
    return modifiedArray;
  }

  myFilter(callback: (myArrayElement: any) => boolean) {
    const modifiedArray: Array<any> = [];
    for (const element of this.myArray) {
      if (callback(element)) modifiedArray.push(element);
    }
    return modifiedArray;
  }
}

const array = new MyArray(['dmt', 'lsd', 'mdma', 'C17NO4H21']);
array.myForeach((element) => {
  element + 's';
});
const filteredArray = array.myFilter((element) => element.length > 3);
const mappedArray = array.myMap((element) => element + 's');
