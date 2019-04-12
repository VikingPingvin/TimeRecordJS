class DataBase{

   constructor(){
       this.dbObj = {
           2019:{
               1:{
                   1:{
                       clockIn: "8:00",
                       clockOut: "8:00"
                   },
                   2:{
                    clockIn: "8:00",
                    clockOut: "8:00"
                   },
                   3:{
                    clockIn: "8:00",
                    clockOut: "8:00"
                   }
               },
               2:{
                1:{
                    clockIn: "8:00",
                    clockOut: "8:00"
                },
                2:{
                    clockIn: "8:00",
                    clockOut: "8:00"
                },
                3:{
                    clockIn: "8:00",
                    clockOut: "8:00"
                }
            }
           }
       }
   };

   getRecord(){
       return dbObj;
   }

   addRecord(){
       console.log("DB Record");
   }
}


module.exports = DataBase;