function flattenChildren(children, isStrict) {
   var index = -1,
       length = children.length,
       resIndex = -1,
       result = [];

   while (++index < length) {
     var value = children[index];

     if (value instanceof Array) {
       var valIndex = -1,
           valLength = value.length;

       result.length += valLength;
       while (++valIndex < valLength) {
         result[++resIndex] = value[valIndex];
       }
     } else {
       result[++resIndex] = value;
     }
   }
   return result;
 }

 export default flattenChildren;