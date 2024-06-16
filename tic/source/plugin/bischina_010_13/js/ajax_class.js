function getXmlHttpObj()
{
       /* Create a new XMLHttpRequest object to talk to the Web server */
      try
      {
             xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e)
      {
             try
            {
                  xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e2)
            {
                  xmlHttp = null;
            }
      }

      if (!xmlHttp && typeof XMLHttpRequest != 'undefined')
      {
           xmlHttp = new XMLHttpRequest();
      }
      return xmlHttp;
}

function sendRequest(mode,url,callback)
{
			
      xmlHttp.open(mode,url, true);
      xmlHttp.onreadystatechange = callback;
      xmlHttp.send(null);
}



