$(function () {
  $(document).on('blur', '.form-control', function () {
    $(this).toggleClass('form-control--has-value', !!$(this).val());
  })
});