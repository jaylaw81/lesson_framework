var content = document.querySelector('#content')
        , data = content.dataset
        , lessonPlan = data.lesson
        ;

var lessons = {
    gistArray: [],
    init: function( ){

        var def = [];
        var res = [];

        def.push($.get('/lessons/' + lessonPlan + '/index.html', function(data) {
            $('#content').html(data);
        }));

        $.when.apply($, def).done(function() {
            lessons.embedGists();
            lessons.getNav(lessonPlan);
        });


    },

    getNav: function(lessonPlan){
        $.getJSON('/lessons/' + lessonPlan + '/sections.json', function(data){

            for(item in data.navItems){
                var navLabel = data.navItems[item].labelName;
                var navSection = data.navItems[item].section;
                var html = '<li><a href="#'+navSection+'">'+navLabel+'</a></li>';
                $('#navigation ul').append(html);
            }

        });
    },

    embedGists: function(){
        var gists = $('.gist-code');
        var scripts = [];

        $.each(gists, function(i, el){
            var gistData = el;
            var gistId = $(el).attr('data-gist');
            var callbackName = "lessons.gistData";
            var script = document.createElement("script");
            script.setAttribute('data-gist-class', gistId);
            script.setAttribute("src", "https://gist.github.com/" + gistId + ".json?callback=" + callbackName);
            $.getJSON("https://gist.github.com/" + gistId + ".json?callback=?", function(data){

                var cssId = '#gistCSS';  // you could encode the css path itself to generate id..
                if ($(cssId).length <= 0){
                    var head  = document.getElementsByTagName( "head" )[0];
                    var link  = document.createElement('link');
                    link.id   = cssId;
                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = data.stylesheet;
                    link.media = 'all';
                    head.appendChild(link);
                }
                $(el).append(data.div);
            });

        })
    },

    gistData: function(){

        lessons.gistArray.push(arguments);

    }

}

$(document).ready(function(){
    lessons.init();
});




