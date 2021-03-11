import axios from 'axios';
import Api from '../../api/craftserver';
export const CREATE_REVIEWSELLER = 'CREATE_REVIEWSELLER';
export const CREATE_REVIEWSELLER_PENDING = 'CREATE_REVIEWSELLER_PENDING';
export const CREATE_REVIEWSELLER_SUCCESS = 'CREATE_REVIEWSELLER_SUCCESS';
export const CREATE_REVIEWSELLER_FAILED = 'CREATE_REVIEWSELLER_FAILED';

// export const createReviewSeller = (dispatch, name,sellerReview,sellerRating) => {
//   console.log('In createReviewSeller action');
//   console.log("action_name>>>>" + name);
//   console.log("action_review>>>" + sellerReview);
//   console.log("action_rating>>>" + sellerRating);
//   dispatch({ type: CREATE_REVIEWSELLER_PENDING });

//   // return async dispatch => {
   
//     fetch('http://61210f1e4302.ngrok.io/api/newsellerreview',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name,
//             sellerReview,
//             sellerRating,
            
//         })
//       }
//     )
//     .then(response => response.json)
//     .then(resData => {
//       dispatch({ type: CREATE_REVIEWSELLER_SUCCESS, payload: resData });
//     })
//     .catch(err => {
//       dispatch({ type: CREATE_REVIEWSELLER_FAILED, payload: response });
//     });

  
// };

export const createReviewSeller = (name,sellerReview,sellerRating) => {
  console.log('In createReviewSeller action');
  console.log("action_name>>>>" + name);
  console.log("action_review>>>" + sellerReview);
  console.log("action_rating>>>" + sellerRating);
  // dispatch({ type: CREATE_REVIEWSELLER_PENDING });


  
  return async dispatch => {

    console.log('Before fetch');
    
    const response = await  Api.post('/api/newsellerreview',
      {
        name,
        sellerReview,
        sellerRating
      }).then(resData => {if (!response.ok) {
        throw new Error('Error create review seller');
      }
       })
    .then(response)
    .then(resData => {
     dispatch({ type: CREATE_REVIEWSELLER_SUCCESS, payload: resData});
    })
     .catch(err => {
      dispatch({ type: CREATE_REVIEWSELLER_FAILED, payload: response });
     });


  };
};

