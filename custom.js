// #
// # author: willowj
// # date: 2018-01-10 13:35:18
// #

/*function search_query(query) {
    times= 0
     //alert("JSON Data: " + json.pages[0]["tags"] );
}*/


function search_query(query, path) {
    var a = 10;
    $.getJSON(path, function(json){

        var search_resurltold = document.getElementsByClassName("search_resurlt")
        if (search_resurltold.length>0){
            search_resurltold[0].parentNode.removeChild(search_resurltold[0]);

        };

        var search_resurlt = search_text_in_json(json, query.trim())

        var searchnavbar = document.getElementById("navbar_search_re");
       // searchnavbar = searchnavbar[searchnavbar.length-1];
        searchnavbar.appendChild(search_resurlt);

    });
}

function search_text_in_json(json_, query) {
    // body

    var pages = json_.pages;
    var search_resurlt=document.createElement("div");
    search_resurlt.setAttribute("class" ,"search_resurlt");
    search_resurlt.setAttribute("id" ,"search_resurlt");

    var res = 0;
    for (var i = pages.length - 1; i >= 0; i--) {
        page_i = pages[i];
        var index = 0;
        var re_itme = "title";
        index = page_i["title"].indexOf(query);
        if (index < 0){
            var re_itme = "url";
            index = page_i["url"].indexOf(query);
        };
        if (index < 0){
            var re_itme = "text";
            index = page_i["text"].indexOf(query);
        };

        if (index >= 0){
           // alert(index);
            res = res + 1;
            if (res==1 & document.getElementById("close_bun") == undefined){
            faclose = document.createElement("button");
            faclose.setAttribute("class", "menu-item-icon fa fa-close fa-fw");
            faclose.setAttribute("id", "close_bun");
            faclose.setAttribute("onclick", "close_search_result()");
            navbar_search_re = document.getElementById("navbar_search_re");
            navbar_search_re.appendChild(faclose);
            // close button > close_search_result
            }
            // results dom
            var article=document.createElement("article");
            article.setAttribute("class", "search_resurlt_item");

            var a = document.createElement("a");
            a.setAttribute("href", page_i["url"]);
            a.innerHTML = page_i["title"];


            var br = document.createElement("br");
            article.appendChild(a);
            article.appendChild(br);


            var elei = document.createElement("i");
            elei.setAttribute("class", "fa fa-folder-open padding-small");
            article.appendChild(elei);

            var a2 = document.createElement("a");
            a2.setAttribute("href",
                "/category/{0}.html".format(page_i["tags"])
                );
            a2.innerHTML = page_i["tags"];
            article.appendChild(a2)

            var br = document.createElement("br");
            article.appendChild(br)

            // reasult  and search_key strong
            var myText1 = document.createTextNode(page_i[re_itme].substring(index-20, index))
            var b = document.createElement("b")
            b.setAttribute("class", "search_key");
            b.innerHTML = page_i[re_itme].substring(index, index+query.length)

            var myText2 = document.createTextNode( page_i[re_itme].substring(index+query.length, index+query.length+30))

            var pragraph = document.createElement("a")
            pragraph.setAttribute("class", "summary");

            pragraph.appendChild(myText1)
            pragraph.appendChild(b)
            pragraph.appendChild(myText2)
            // reasult  and search_key strong

            article.appendChild(pragraph)
            search_resurlt.appendChild(article);
        };
    };
    if (res==0) {
        search_resurlt.innerHTML= "no results";
    }
    return search_resurlt;
}


function close_search_result() {
    search_resurlt = document.getElementById("search_resurlt")
    search_resurlt.setAttribute("style","display:none")

    close_bun = document.getElementById('close_bun')
    close_bun.parentNode.removeChild(close_bun)
}

String.prototype.format = function(arg) {
    var result = this; //.split("").join("");
    reg = /\{\d*\}/g ;
    res = reg.exec(result);
    if(res) {
         for(var i = 0; i < arguments.length; i++) {
            var n = i;
            result = result.replace(eval('/\\{' + i + '\\}/g'),
                String(arguments[i])
                );
            };
    };
return result;
};
