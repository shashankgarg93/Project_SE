export const Team = (props) => {
  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Meet the Team</h2>
          <p>
           Four individuals on the verge of brilliance.
          </p>
        </div>
        <div id='row'>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-3 col-sm-6 team'>
                  <div className='thumbnail'>
                    {' '}
                    <img src={d.img} alt='...' className='team-img' />
                    <div className='caption'>
                    
                      <div style={{float:'left',marginLeft:"10px",marginTop:'8px'}}>
                      <a href={d.job}>
                      <i className='fa fa-linkedin'></i>
                    </a>
                     </div>
                     <div style={{float:'left',marginLeft:'30px'}}>
                      <h4>{d.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}
