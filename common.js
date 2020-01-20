var query = new URLSearchParams(window.location.search);
var frameId = query.get('id');

function sendMessage(params) {
  window.parent.postMessage({
    id: frameId,
    ...params
  },
  '*');
}

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    sendMessage({
      message: 'embed:open-external',
      uri: event.target.href
    })
  }
}, false);

const handlePageLoad = window.handlePageLoad = () => {
  if (window.parent) {
    sendMessage({
      message: 'embed:adjust-iframe-size',
      height: document.body.scrollHeight
    })
  }
};

window.addEventListener('load', handlePageLoad, false);
