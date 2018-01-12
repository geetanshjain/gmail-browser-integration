/**
 * Created by dell on 1/13/2018.
 */


var clientId = '127956138907-kpoe2car3tti9qoktle7rvlb2k9scjvr.apps.googleusercontent.com';
var apiKey = 'AIzaSyDw7sQrIBT2jqmKHE21NZjd6J03mIY4bX4';
var scopes = 'https://www.googleapis.com/auth/gmail.readonly';


function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
    }, handleAuthResult);
}

function handleAuthClick() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
    }, handleAuthResult);
    return false;
}

function handleAuthResult(authResult) {
    if(authResult && !authResult.error) {
        loadGmailApi();
        $('#authorize-button').remove();
        $('.table-inbox').removeClass("hidden");
    } else {
        $('#authorize-button').removeClass("hidden");
        $('#authorize-button').on('click', function(){
            handleAuthClick();
        });
    }
}

function loadGmailApi() {
    gapi.client.load('gmail', 'v1', displayInbox);
}


function displayInbox() {

    var request = gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'INBOX',
        'maxResults': 10
    });

    request.execute(function(response) {
        $.each(response.messages, function() {
            var messageRequest = gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': this.id
            });

            messageRequest.execute(appendMessageRow);
        });
    });
}

function appendMessageRow(message) {
    $('.table-inbox tbody').append(
        '<tr>\
          <td>'+getHeader(message.payload.headers, 'From')+'</td>\
      <td>\
        <a href="#message-modal-' + message.id +
        '" data-toggle="modal" id="message-link-' + message.id+'">' +
        getHeader(message.payload.headers, 'Subject') +
        '</a>\
      </td>\
      <td>'+getHeader(message.payload.headers, 'Date')+'</td>\
    </tr>'
    );


    $('body').append(
        '<div class="modal fade" id="message-modal-' + message.id +
        '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
      <div class="modal-dialog modal-lg">\
        <div class="modal-content">\
          <div class="modal-header">\
            <button type="button"\
                    class="close"\
                    data-dismiss="modal"\
                    aria-label="Close">\
              <span aria-hidden="true">&times;</span></button>\
            <h4 class="modal-title" id="myModalLabel">' +
        getHeader(message.payload.headers, 'Subject') +
        '</h4>\
      </div>\
      <div class="modal-body">\
        <iframe id="message-iframe-'+message.id+'" srcdoc="<p>Loading...</p>">\
          </iframe>\
        </div>\
      </div>\
    </div>\
  </div>'
    );


}


function getHeader(headers, index) {
    var header = '';
    $.each(headers, function(){
        if(this.name.toLowerCase() === index.toLowerCase()){
            header = this.value;
        }
    });
    return header;
}

function searchFunction() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("resultTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

