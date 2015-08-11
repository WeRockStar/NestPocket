$(function () {
    $('#sign-out').click(function () {
        localStorage['user'] = null;
        location.href = "../index.html";
    });
});