const listTextareaMCE = document.querySelectorAll('[textarea-mce]');

if(listTextareaMCE.length > 0) {
  listTextareaMCE.forEach(textarea => {
    tinymce.init({
      selector: 'textarea[textarea-mce]',
      plugins: 'image code',
      image_title: true,
      images_upload_url: '/admin/upload',
      automatic_uploads: true,
      file_picker_types: 'image',
    });
  });
}






