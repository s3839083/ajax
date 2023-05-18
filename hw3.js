$(document).ready(function() {
  $('#list button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./list', {}, (data) => {
      var students = '';
      for(const id in data){    
        students += `${id} : ${data[id]}<br>`;
      }
      $('#list-output').html(students);
    })
  });

  $('#search button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./search', {
        id: $('#search input[name=ID]').val() 
      }, (data) => {
      if(data != ''){
        $('#search-output').html(`Hello, ${data}`);
      }
      else{
        $('#search-output').html(`Insert wrong student ID`);
      }
    })
  });
  
  $('#add button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./add',{
        id: $('#add input[name=ID]').val(),
        name: $('#add input[name=name]').val()
      },(data) => {
          $('#add-output').html(data);
      })
  });

  $('#delete button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./delete', {
      id: $('#delete input[name=ID]').val()
      },(data) => {
        $('#delete-output').html(data);
      })
  });
});
