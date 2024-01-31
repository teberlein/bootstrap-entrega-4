  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  
    $(function(){
      $('.carousel').carousel({
      interval: 3000
      });

      const myModalEl = document.getElementById('newsletterModal')
      myModalEl.addEventListener('show.bs.modal', event => {
       console.log('El elemento se está mostrando')
        $('#btn-newsletter').removeClass('btn-outline-primary')
        $('#btn-newsletter').addClass('btn-outline-dark')
        $('#btn-newsletter').prop('disabled', true)
      })

      myModalEl.addEventListener('shown.bs.modal', event => {
       console.log('El elemento se mostró')
      })

      myModalEl.addEventListener('hide.bs.modal', event => {
       console.log('El elemento se está ocultando')
      })

      myModalEl.addEventListener('hidden.bs.modal', event => {
       console.log('El elemento se ocultó')
        $('#btn-newsletter').removeClass('btn-outline-dark')
        $('#btn-newsletter').addClass('btn-outline-primary')
        $('#btn-newsletter').prop('disabled', false)
      })
    })