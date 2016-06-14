function(page) {
  var that = this
  var dom = page.getStaticDom();
  var location = page.getLocation('static');
  var static_url = location.href
  //check if we got some data to work with
  if (!dom) { return null; }
    var alternates = dom.querySelectorAll('link[rel=alternate][hreflang]');
    var canonical = dom.querySelectorAll('link[rel=canonical]')[0];
    var type = 'info';
    var lable = "HEAD";
    console.log(alternates);
    console.log(alternates.length);
    if (alternates.length > 0)
    {
        var alternates_array = Array.prototype.slice.call(alternates);
        var codestring = ''
        var linkstring = ''
        var purecodestring = ''
        alternates_array.forEach(
          function(value)
          {
            //console.log(value);
            //console.log(value.outerHTML);
            purecodestring = purecodestring + value.outerHTML + "\n";
            codestring = codestring + that.htmlEntitiesEncode(value.outerHTML) + "\n";
            linkstring = linkstring + '<a href="'+value.href+'" title="'+value.href+'" target="_top">'+value.hreflang+'</a> ';
            //console.log(that);
          }
        )
        var rellist='<br><textarea readonly>'+codestring+'</textarea>';
      return this.createResult(1, lable, alternates.length+' link-rel-alternate found.'+rellist+' '+this.dataUrlTextLink(purecodestring , 'View partial code.')+'<br>'+linkstring, type);
    }
    else {
      return this.createResult(1, lable, 'No link-rel-alternate-hreflang found.', type);
    }

  //return this.createResult(1, lable, 'Title: '+titletags[0].innerText, 'info');
  return null;
}