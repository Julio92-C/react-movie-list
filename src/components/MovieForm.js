import React, {useState} from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Form, FormField, Rating, Button } from 'semantic-ui-react';


export const MovieForm = ({onNewMovies}) => {
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(1);


    return (
        <Form>
            <Form.Field>
                <input
                   placeholder="movie title" 
                   movie={title}
                   onChange={e => setTitle(e.target.value)}
                />
            </Form.Field>
            <FormField>
                <Rating 
                    icon="star" 
                    rating={rating} 
                    maxRating={5} 
                    onRate={(_, data) => {
                        setRating(data.rating);
                    }}
                />
            </FormField>
            <FormField>
                <Button onClick={async () => {
                    const movie = {title, rating};
                    const response = await fetch('/add_movie', {
                        method: 'POST',
                        headers: {
                            'Contect-Type': 'application/json'
                        },
                        body: JSON.stringify(movie)
                    });

                    if (response.ok) {
                        console.log('response worked!');
                        onNewMovies(movie);
                        setTitle("");
                        setRating(1);
                    }
                }}>Submit</Button>
            </FormField>
        </Form>
    )
}