/*
This scrtpt file is developed by
Aditya Kameswara Rao Nandula
Senior Research Fellow,
Virtual Labs IIT Kharagpur.
LinkedIn: https://www.linkedin.com/in/akraonandula/

*/
var b1 = document.getElementById('b1'),
    b2 = document.getElementById('b2'),
    b3 = document.getElementById('b3');
b12 = new LeaderLine(b1, b2,
      {startPlug: 'disc',endPlug: 'arrow3', middleLabel: LeaderLine.pathLabel('x(t)', {fontFamily: 'Arial, sans-serif'})});
b13 = new LeaderLine(b1, LeaderLine.pointAnchor(b3, {x: '0%', y: '20%'}),
      {startPlug: 'disc',endPlug: 'arrow3', middleLabel: LeaderLine.pathLabel('x(t)', {fontFamily: 'Arial, sans-serif'}), endLabel: LeaderLine.pathLabel('Ch1', {fontFamily: 'Arial, sans-serif'})});
b23 = new LeaderLine(b2, LeaderLine.pointAnchor(b3, {x: '0%', y: '80%'}),
      {startPlug: 'disc',endPlug: 'arrow3', middleLabel: LeaderLine.pathLabel('y(n)', {fontFamily: 'Arial, sans-serif'}),endLabel: LeaderLine.pathLabel('Ch2', {fontFamily: 'Arial, sans-serif'})});

  new PlainDraggable(b1,{
    onMove: function() { $("#s1").prop("checked",false),
    $("#sn").text("Circuit OFF"),
    $("#sn").css("background","red"),
    b12.dash = false,
    b13.dash = false,
    b23.dash = false,
    $("#grp").slideUp(),
    $("#ctl").slideUp(),
    $("#pa").slideUp(),
    ckt=0,
    plt(0),
    b12.position(),b13.position(); }});

  new PlainDraggable(b2, {
    onMove: function() {$("#s1").prop("checked",false),
    $("#sn").text("Circuit OFF"),
    $("#sn").css("background","red"),
    b12.dash = false,
    b13.dash = false,
    b23.dash = false,
    $("#grp").slideUp(),
    $("#ctl").slideUp(),
    $("#pa").slideUp(),
    ckt=0,
    plt(0),
    b12.position(),b23.position(); }
    });

  new PlainDraggable(b3, {
    onMove: function() { $("#s1").prop("checked",false),
    $("#sn").text("Circuit OFF"),
    $("#sn").css("background","red"),
    b12.dash = false,
    b13.dash = false,
    b23.dash = false,
    $("#grp").slideUp(),
    $("#ctl").slideUp(),
    $("#pa").slideUp(),
    ckt=0,
    plt(0),
    b13.position(),b23.position(); }
    });


  var ckt=0;
  var ch=0;
  var clp=0;
  var amp= $("#av").val();
  var fre= $("#fv").val();
  var vc1= $("#vc1v").val();
  var t1= $("#t1v").val();
  var px1= $("#px1v").val();
  var py1= $("#py1v").val();
  var vc2= $("#vc2v").val();
  var t2= $("#t2v").val();
  var px2= $("#px2v").val();
  var py2= $("#py2v").val();

  function rng(start,len,end) {
      var ans = [];
      for (var i = start; i <= len; i++) {
          ans.push(start+i/len*end);
      }
      return ans;
  };
  function po(v,x) {
              var ans = [];
              for(let i=0;v[i]!=undefined;i++)
                  {
                        ans.push(v[i]+Number(x));
                      }
              return ans;
    };
  function rngscn(a,f,x) {
      var ans = [];
        for(let i=0;x[i]!=undefined;i++)
          {
            ans.push(a*Math.sin(f*x[i]));
          }
      return ans;
  };
  function hawa(a,vi) {
          var ans = [];
          if(a<0){
                  alert("Select Amplitude (A) should be greaterthan 0 \n select A value properly");
                }
          else{
            for(let i=0;vi[i]!=undefined;i++){
                if(vi[i]>0){
                    ans.push(vi[i]);
                  }
                else{
                    ans.push(0);
                  }
                }
            }
          return ans;
      };
  function parame(vm){
        var vrms=vm/2;
        var vdc=vm/Math.PI;
        var vac=Math.sqrt(Math.pow(vrms,2)-Math.pow(vdc,2));
        var rf=vac/vdc;
        var effe=Math.pow(vdc,2)/Math.pow(vrms,2)*100;
        $("#vrms").text(vrms.toFixed(2));
        $("#vdc").text(vdc.toFixed(2));
        $("#vac").text(vac.toFixed(2));
        $("#rf").text(rf.toFixed(2));
        $("#effe").text(effe.toFixed(2));

      };


  function plt(cha){
    var amp= $("#av").val();
    var fre= $("#fv").val();
    var fs= $("#fsv").val();
    var vc1= $("#vc1v").val();
    var t1= $("#t1v").val();
    var px1= $("#px1v").val();
    var py1= $("#py1v").val();
    var vc2= $("#vc2v").val();
    var t2= $("#t2v").val();
    var px2= $("#px2v").val();
    var py2= $("#py2v").val();
    var len=1000;
              parame(amp);
                var amp1=amp/vc1;
                var amp2=amp/vc2;
                fre1=fre*t1;
                fre2=fre*t2;
                var ti= rng(0,len,2*Math.PI);
                var n=fs*ti;
                var vi= rngscn(amp1,fre1,ti);
                var vo= rngscn(amp2*0,fre2,ti);

                var tim1= rng(0,len,fre1);
                var tim2= rng(0,len,fre2);
                var ti1= po(tim1,px1);
                var ti2= po(tim2,px2);
                var haw= hawa(amp2,vo);
                vi= po(vi,py1);
                haw= po(haw,py2);
                gr = document.getElementById('grph');
                    var in1 = {
                          x: ti1,
                          y: vi,
                          type: 'scatter',
                          name: 'Input(Vi)'
                    };
                    var op1 = {
                          x: ti2,
                          y: haw,
                          type: 'scatter',
                          name: 'Output(Vo)'
                    };

                    if(cha=='1'){
                      var data = [in1];
                      var layout={title: 'Input (Vi)', plot_bgcolor: 'black',paper_bgcolor:'black',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      },
                      xaxis: {
                        title:'Time (s)',
                        showticklabels: false,
                        autotick: true},
                        yaxis: {
                          title:'Input(V)',
                          showticklabels: true,
                          autotick: true}
                      };
                    }
                    else if(cha=='2'){
                      var data = [op1];
                      var layout={title: 'Sampled signal (Vo)', plot_bgcolor: 'black',paper_bgcolor:'black',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      },
                      xaxis: {
                        title:'Time (s)',
                        showticklabels: false,
                        autotick: true},
                        yaxis: {
                          title:'Output (V)',
                          showticklabels: true,
                          autotick: true}
                      };
                      }
                    else if(cha=='3'){
                      var data = [in1,op1];
                      var layout={title: 'Sampling theorem Plot',plot_bgcolor:'black', paper_bgcolor:'black',text_color:'blue',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      },
                      xaxis: {
                        title:'Time (s)',
                        showticklabels: false,
                        autotick: true},
                        yaxis: {
                          title:'Vi/Vo (V)',
                          showticklabels: true,
                          autotick: true}
                      };
                      }
                    else{
                      var data = [];
                      var layout={title: 'Sampling theorem Plot',plot_bgcolor: 'black',paper_bgcolor:'black',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      },
                      xaxis: {
                        title:'Time (s)',
                        showticklabels: false,
                        autotick: true},
                        yaxis: {
                          title:'Vi/Vo (V)',
                          showticklabels: true,
                          autotick: true}
                      };
                    }
                    Plotly.newPlot(gr, data,layout);
  };

$(document).ready(function(){
    $("#ctl").slideUp();
    $("#vi").text($("#av").val());
    $("#f").text($("#fv").val());
    $("#fs").text($("#fsv").val());
    $("#vc1").text($("#vc1v").val());
    $("#t1").text($("#t1v").val());
    $("#px1").text($("#px1v").val());
    $("#py1").text($("#py1v").val());
    $("#vc2").text($("#vc2v").val());
    $("#t2").text($("#t2v").val());
    $("#px2").text($("#px2v").val());
    $("#py2").text($("#py2v").val());
    $("#s1").prop("checked",false);
    $("#sn").text("Circuit OFF");
    $("#sn").css("background","red");
    $("#grp").slideUp();
    $("#ctl").slideUp();
    $("#pa").slideUp();
    ckt=0;
    plt(0);
});

    $("#s1").click(function(){
      if(ckt==0){
      $("#sn").text("Circuit ON");
      $("#sn").css("background","green");
      $("#ctl").slideDown("slow");
      $("#grp").slideDown("slow");
      $("#pa").slideDown("slow");
        b12.dash = {animation: true};
        b13.dash = {animation: true};
        b23.dash = {animation: true};
      ckt=1;
      plt(ch);
    }
    else{
      $("#sn").text("Circuit OFF");
      $("#sn").css("background","red");
      $("#grp").slideUp();
      $("#ctl").slideUp();
      $("#pa").slideUp();
        b12.dash = {animation: false};
        b13.dash = {animation: false};
        b23.dash = {animation: false};
        b12.dash = false;
        b13.dash = false;
        b23.dash = false;
      ckt=0;
      plt(0);
    }
  });
    $("#av").change(function(){
      $("#vi").text($("#av").val());
      plt(ch);
    });
    $("#fv").change(function(){
      $("#f").text($("#fv").val());
      plt(ch);
    });
    $("#fsv").change(function(){
      $("#fs").text($("#fsv").val());
      plt(ch);
    });
    $("#vc1v").change(function(){
      $("#vc1").text($("#vc1v").val());
      plt(ch);
    });
    $("#t1v").change(function(){
      $("#t1").text($("#t1v").val());
      plt(ch);
    });
    $("#px1v").change(function(){
      $("#px1").text($("#px1v").val());
      plt(ch);
    });
    $("#py1v").change(function(){
      $("#py1").text($("#py1v").val());
      plt(ch);
    });
    $("#vc2v").change(function(){
      $("#vc2").text($("#vc2v").val());
      plt(ch);
    });
    $("#t2v").change(function(){
      $("#t2").text($("#t2v").val());
      plt(ch);
    });
    $("#px2v").change(function(){
      $("#px2").text($("#px2v").val());
      plt(ch);
    });
    $("#py2v").change(function(){
      $("#py2").text($("#py2v").val());
      plt(ch);
    });
    $("#bc1").click(function(){
      ch=1;
      plt(ch);
    });
    $("#bc2").click(function(){
      ch=2;
      plt(ch);
    });
    $("#du").click(function(){
      ch=3;
      plt(ch);
    });
