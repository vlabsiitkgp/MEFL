
$( function() {
   $( "#e1,#e2,#e3,#e4,#e5,#e6" ).draggable();
   adi();
 } );
 var l1=new LeaderLine(e1, e2, {
 startPlugColor: '#1a6be0',
 endPlugColor: '#1efdaa',
 gradient: true
 });
 var l2=new LeaderLine(e2, e3, {dash: {animation: true}});
 var l3=new LeaderLine(e4, e5, {dropShadow: true});
 var l4=new LeaderLine(e5, e6, {dash: true});

 function adi(){
l1=l1.pathLabel({
  startLabel: LeaderLine.pathLabel('START'),
  middleLabel: LeaderLine.pathLabel('MIDDLE'),
  endLabel: LeaderLine.pathLabel('END')
});
};
$("#e1,#e2,#e3,#e4,#e5,#e6").click(function(){
adi();
});
