export function getTime(){
    var d = new Date();

    var meridiem = d.getHours() >= 12 ? 'PM' : 'AM';
    var hours = d.getHours() % 12 || 12;

    var time = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + "-[TIME]" + hours + ":" + ("0" + d.getMinutes()).slice(-2) +" "+ meridiem;
    return time
}