function showAllPosts() {
  return fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Post not found');
      }
      return response.json();
    })
    .then(posts => {
      const postsContainer = document.createElement('div');
      postsContainer.classList.add('postsContainer');
      posts.forEach(post => {
        const postInner = document.createElement('div');
        postInner.classList.add('postInner');
        const h2 = document.createElement('h2');
        h2.innerText = post.id;
        postInner.innerText = post.title;
        postInner.prepend(h2);
        postsContainer.append(postInner);
      });

      document.body.prepend(postsContainer);
    })
    .catch(error => {
      console.error(error);
    });
}

function findById(postID) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Post not found');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error(error);
    });
}

const resultDiv = document.querySelector('#resultContainer');
resultDiv.classList.add('d-none');
const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', () => {
  const postID = parseInt(document.querySelector('#postId').value);
  if (postID >= 1 && postID <= 100) {
    findById(postID)
      .then(post => {
        resultDiv.classList.toggle('d-none');
        resultDiv.classList.add('resultPost');
        const h2 = document.createElement('h2');
        const text = document.createElement('p');
        h2.innerText = post.id;
        text.innerText = `Text: ${post.body}`;
        resultDiv.innerText = `Title: ${post.title}`;

        resultDiv.prepend(h2);
        resultDiv.append(text);
        addCommentButton(postID);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    alert('Incorrect ID. Enter a number from 1 to 100.');
  }
});

function addCommentButton(id) {
  const commentButton = document.createElement('button');
  commentButton.innerText = 'Show Comments';
  resultDiv.append(commentButton);
  commentButton.addEventListener('click', () => showComments(id));
}

const commentsContainer = document.createElement('div');
commentsContainer.classList.add('commentsContainer');
function showComments(id) {
  commentsContainer.innerHTML = "";
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Comments not found');
      }
      return response.json();
    })
    .then(comments => {
      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerText = comment.body;

        commentsContainer.append(commentElement);
      });
      const h3 = document.createElement('h3');
      h3.innerText = 'COMMENTS';

      resultDiv.append(h3, commentsContainer);
    })
    .catch(error => {
      console.error(error);
    });
}

showAllPosts();
