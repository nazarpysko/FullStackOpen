const BlogForm = ({ onSubmit, onChange, value }) => {
    return (
        <div>
            <h2> create a new blog </h2>
        <form onSubmit={ onSubmit }>
          title:
          <input
            type='text'
            value={ value.title }
            name='Title'
            onChange={ ({ target }) => onChange({ ...value, title: target.value }) }
          />

          <br/>

          author:
          <input
            type='text'
            value={ value.author }
            name='Title'
            onChange={ ({ target }) => onChange({ ...value, author: target.value }) }
          />

          <br/>

          url:
          <input
            type='text'
            value={ value.url }
            name='Title'
            onChange={ ({ target }) => onChange({ ...value, url: target.value }) }
          />

          <br/>

          <button type='submit'> create </button>
        </form>

        </div>
    )
}

export default BlogForm