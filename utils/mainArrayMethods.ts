interface IMyArray {
  myArray: Array<any>;
  myForeach: (callback: (myArrayElement: any) => undefined) => undefined;
  myMap: (callback: (myArrayElement: any) => any) => any[];
  myFilter: (callback: (myArrayElement: any) => boolean) => any[];
}

class MyArray implements IMyArray {
  myArray: any[];

  constructor(initialArray?: Array<any>) {
    this.myArray = initialArray || [];
  }

  myForeach(callback: (myArrayElement: any) => undefined) {
    for (const element of this.myArray) {
      callback(element);
    }
    return undefined;
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
