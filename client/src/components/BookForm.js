import {useState} from 'react';

const BookForm = () => {
  const [bookInfo, setBookInfo] = useState({
    name: '',
    author: '',
    pages: 0
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setBookInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookInfo),
      });

      if (response.ok) {
        console.log('Book added to database.');
      } else {
        console.error('Failed to add book to database');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Book Name:
        <input
          type="string"
          name="name"
          id="name"
          value={bookInfo.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <br/>
      <label>
        Author:
        <input
          type="string"
          name="author"
          id='author'
          value={bookInfo.author}
          onChange={handleInputChange}
          required
        />
      </label>
      <br/>
      <label>
        Pages:
        <input
          type="number"
          name="pages"
          id='pages'
          value={bookInfo.pages}
          onChange={handleInputChange}
          required
        />
      </label>
      <br/>
      <input type="submit" id='submit' value="Submit" />
    </form>
  );
};

export default BookForm;
