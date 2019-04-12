// Time record class
class Record {
    constructor(recordDate, clockIn, clockOut) {
        this.recordDate = recordDate;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
    }

    getHourDiff(){
        /*let inHour = this.clockIn.split(':')[0];
        let outHour = this.clockOut.split(':')[0];
        let inMinute = this.clockIn.split(':')[1];
        let outMinute = this.clockOut.split(':')[1];
        */
        let start = parseFloat(this.clockIn.split(':')[0]) + parseFloat(this.clockIn.split(':')[1] / 60);
        let end = parseFloat(this.clockOut.split(':')[0]) + parseFloat(this.clockOut.split(':')[1] / 60);

        console.log(`In hour: ${this.clockIn.split(':')[0]}, in min: ${this.clockIn.split(':')[1] / 60}`)
        console.log(end);
        console.log(start);
        console.log(end-start);
        return (end-start).toFixed(2);
    }

    getNetDiff(){
        let grossHours = this.getHourDiff();
        // 6.0 - 6.50 
        // 9.5 - 9.83

        if( grossHours <= 6.0){
            return grossHours;
        } else if ( grossHours > 6.0 && grossHours <= 6.5){
            return 6.0;
        } else if (grossHours > 6.0 && grossHours <= 9.5){
            return grossHours - 0.5;
        } else if(grossHours > 9.5 && grossHours < 9.83){
            return 9.0;
        } else if (grossHours >= 9.83){
            return grossHours - 0.83;
        }
    }
    getrecords() {
        const StoredRecords = [
        {
            recordDate: "2019-01-10",
            clockIn: "7:40",
            clockOut: "16:00"
        },
        {
            recordDate: "2019-01-11",
            clockIn: "7:40",
            clockOut: "16:00"
        }
    ];
    return StoredRecords;
}
}

module.exports = Record;