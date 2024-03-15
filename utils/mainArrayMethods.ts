const myArray = {
  myArray: [],
  myForeach: (callback: (myArrayElement: any) => undefined) => {
    for (const element of myArray.myArray) {
      callback(element);
    }
  },
  myMap: (callback: (myArrayElement: any) => any) => {
    const modifiedArray = [];
    for (const element of myArray.myArray) {
      modifiedArray.push(callback(element));
    }
    return modifiedArray;
  },
  myFilter: (callback: (myArrayElement: any) => boolean) => {
    const modifiedArray: Array<any> = [];
    for (const element of myArray.myArray) {
      if (callback(element)) modifiedArray.push(element);
    }
    return modifiedArray;
  },
};

myArray.myArray = ['dmt', 'lsd', 'mdma', 'C17NO4H21'] as never;
myArray.myForeach((element) => {
  element + 's';
});
const filteredArray = myArray.myFilter((element) => element.length > 3);
const mappedArray = myArray.myMap((element) => element + 's');
