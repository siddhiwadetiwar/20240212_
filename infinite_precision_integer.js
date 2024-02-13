/* My class-based implementation of an inifinite precision integer. */

class InfiniteNumber {
    /**
     * Constructor of InfiniteNumber class.
     * @param {Number|String|Array|Object} inputObject - The input object can be a number, string, array, or object.
     */
    _internalArray = [];
    constructor(inputObject) {
      console.log("Just inside the constructor " + typeof (inputObject))
  
      if (typeof (inputObject) === "number") {
        // check if Number is not a NaN
        if (isNaN(inputObject)) {
          throw new Error("Input is NaN.")
        }
  
        // check for negative values
        if (inputObject < 0) {
          throw new Error("Input cannot be negative")
        }
  
        // check for integral values only
        if ((inputObject % 1) != 0) {
          throw new Error("Input needs to be an integral value.")
        }
        
        while (inputObject != 0) {
          this._internalArray.unshift(inputObject % 10)
          inputObject = Math.floor(inputObject / 10)
        }
      } else if (typeof (inputObject) === "string") {
        // check if length is not zero
        if (inputObject.length == 0) {
          throw new Error("Empty string is not accepted.")
        }
  
        // check if every character is a decimal digit
        let myRegex = /^[0-9]+$/
        if (!myRegex.test(inputObject)) {
          throw new Error("String can have decimal numbers only.")
        }
  
        for (let index = 0; index < inputObject.length; index++) {
          const currentDigit = parseInt(inputObject.charAt(index))
          this._internalArray.push(currentDigit)
        }
      } else if (Array.isArray(inputObject)) {
        console.log("You sent an Array")
  
        // validate the individual elements of the inputArray
        for (let i = 0; i < inputObject.length; i++) {
          if (typeof inputObject[i] !== "number" || inputObject[i] < 0 || (inputObject[i] % 1) !== 0) {
            throw new Error("Invalid input array. Each element should be a positive integer.")
          }
        }
  
        // initialize the member array
        this._internalArray = inputObject.slice().reverse()
      } else if (typeof inputObject === "object") {
        console.log("You sent an Object")
  
        // check if this object has getInternalArray() method
        if (typeof inputObject.getInternalArray !== "function") {
          throw new Error("Invalid input object. It should have a getInternalArray() method.")
        }
  
        // initialize the member array
        this._internalArray = inputObject.getInternalArray().slice().reverse()
      } else {
        console.log("You sent some bullshit!")
  
        throw new Error(`Constructor of IniniteNumber does not support this data`
          + ` type ${typeof inputObject}`)
      }
    }
  
    /** Helper method to return the _internalArray variable which contains the
     * Inifnite precision Integer.
     * @returns {Array<Number>} the internal array representing individual digits
     */
    getInternalArray() {
      // return a deep copy of the internal array
      return this._internalArray.slice()
    }
  
    /** Helper method to return the representation of this Infinite Precision
     * Integer as a string.
     */
    getNumberAsString() {
      return this._internalArray.join('')
    }
  
    /**
     * Merge two InfiniteNumber objects.
     * @param {InfiniteNumber} anotherInfiniteNumber
     * The InfiniteNumber object to be merged with.
     * @returns {InfiniteNumber} the merged InfiniteNumber object.
     */
    additionOperation(anotherInfiniteNumber) {
        let array1 = anotherInfiniteNumber.getInternalArray();
        let array2 = this._internalArray;

        //reversing the array
        let num1 = array1.slice().reverse();
        let num2 = array2.slice().reverse();

        for (let j = 0; j < num1.length; j++) {
            if (num1[j] < 0 || num2[j] < 0) {
                throw new Error("Negative numbers as input are invalid")
            }
            if (num1[j] > 9 || num2[j] > 9) {
                throw new Error("Numbers greater than 9 as input are invalid")
            }
        }

        //ensuring both arrays are of the same length by prepending zeros
        while (num1.length < num2.length) {
            num1.push(0);
        }
        while (num2.length < num1.length) {
            num2.push(0);
        }

        let result = [];
        let carry = 0;

        //iterate for loop to add digits with carry when needed
        for (let i = 0; i < num1.length; i++) {
            let sum = num1[i] + num2[i] + carry;
            //finding the value of carry using floor division
            carry = Math.floor(sum / 10);
            //pushing the remainder into the result array
            result.unshift(sum % 10);
        }

        //if there's any remaining carry after loop append it with result
        if (carry > 0) {
            result.unshift(carry);
        }
        result = result.reverse()

        // create a new InfiniteNumber object with the result array
        return new InfiniteNumber(result);
    }



    /**subtract two infinitenumber objects
     * @param {InfiniteNumber} anotherInfiniteNumber 
     * The InfiniteNumber object to be subtracted from.
     * @returns {InfiniteNumber} the merged InfiniteNumber object.
     */

    subtractionOperation(anotherInfiniteNumber) {
        let num1 = this._internalArray.slice().reverse();
        let num2 = anotherInfiniteNumber.getInternalArray().slice().reverse();
    
        for (let j = 0; j < num1.length; j++) {
            if (num1[j] < 0 || num2[j] < 0) {
                throw new Error("Negative numbers as input are invalid")
            }
            if (num1[j] > 9 || num2[j] > 9) {
                throw new Error("Numbers greater than 9 as input are invalid")
            }
        }
    
        //ensuring both arrays are of same length by prepending zeros
        while (num1.length < num2.length) {
            num1.push(0);
        }
        while (num2.length < num1.length) {
            num2.push(0);
        }
    
        //variable to track negative result and swap if needed
        let flag = false;
    
        for (let i = num1.length - 1; i >= 0; i--) {
            if (num1[i] < num2[i]) {
                //swapping if num1 less than num2
                [num1, num2] = [num2, num1];
                //change the flag value to true if swapped
                flag = true;
                break;
            } else if (num1[i] > num2[i]) {
                break;
            }
        }
    
        //for loop to adjust digits, adds 10 and subtracts 1 if needed
        for (let i = 0; i < num1.length; i++) {
            if (num1[i] < num2[i]) {
                num1[i] = num1[i] + 10;
                num1[i + 1] -= 1;
            }
            num1[i] = num1[i] - num2[i];
        }
    
        //while loop to remove trailing zeros if array length greater than 1
        while (num1.length > 1 && num1[num1.length - 1] === 0) {
            num1.pop();
        }
    
        let result = num1.reverse();
    
        //add minus sign in case smaller number is subtracted from bigger
        if (flag) {
            result.unshift('-');
        }
        result = result.reverse()
        // create a new InfiniteNumber object with the result array
        return new InfiniteNumber(result);
    }

    /**multiply two infinitenumber objects
     * @param {InfiniteNumber} anotherInfiniteNumber 
     * The InfiniteNumber object to multiply with.
     * @returns {InfiniteNumber} the merged InfiniteNumber object.
     */

    multiplicationOperation(anotherInfiniteNumber) {
        let num1 = this._internalArray.slice().reverse();
        let num2 = anotherInfiniteNumber.getInternalArray().slice().reverse();
    
        // declaring variable result as an array containing 0s
        let result = [];
    
        for (let j = 0; j < num1.length; j++) {
            if (num1[j] < 0 || num2[j] < 0) {
                throw new Error("Negative numbers as input are invalid");
            }
            if (num1[j] > 9 || num2[j] > 9) {
                throw new Error("Numbers greater than 9 as input are invalid");
            }
        }
    
        // for loop to calculate product of digits and add to result array
        for (let i = 0; i < num1.length; i++) {
            for (let j = 0; j < num2.length; j++) {
                let product = num1[i] * num2[j] + (result[i + j] || 0);
                // update the result array with the ones digit of the product.
                result[i + j] = product % 10;
                // update result array with tens digit of product
                result[i + j + 1] = (result[i + j + 1] || 0) + Math.floor(product / 10);
            }
        }
    
        // remove leading zeros in the result
        while (result.length > 1 && result[result.length - 1] === 0) {
            result.pop();
        }

        
        // create a new InfiniteNumber object with the reversed result array
        return new InfiniteNumber(result);
    }
    
    
}
const obj1 = new InfiniteNumber(12783);
const obj2 = new InfiniteNumber("1278");

//let mergedNum = obj1.additionOperation(obj2);
// let mergedNum = obj1.subtractionOperation(obj2);
let mergedNum = obj1.multiplicationOperation(obj2);

console.log(mergedNum.getInternalArray()); 
console.log(mergedNum.getNumberAsString()); 