import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { addMovie, getWatchlist, updateMovie ,deleteMovie} from '../utils/db.js';
import { authorizeModification } from '../middleware/authorize.js';


const watchlistRouter = express.Router();

watchlistRouter.get('/:userId', authenticate, (req, res) => {
    const watchlistByid = getWatchlist(parseInt(req.params.userId))
    return res.status(200).json(watchlistByid)
})
// Ubah dari authorizeModification() menjadi authorizeModification (tanpa kurung)
watchlistRouter.post('/:userId/movies', authenticate, authorizeModification, (req, res) => {
    const result = addMovie(parseInt(req.params.userId), req.body);
    return res.status(201).json(result);
});

watchlistRouter.put('/:userId/movies/:movieId', authenticate, authorizeModification, (req, res) => {
    const result = updateMovie(parseInt(req.params.userId), parseInt(req.params.movieId), req.body);
    return res.status(200).json(result);
});

watchlistRouter.delete('/:userId/movies/:movieId', authenticate, authorizeModification, (req, res) => {
    const result = deleteMovie(parseInt(req.params.userId), parseInt(req.params.movieId));
    return res.status(200).json(result);
});

export default watchlistRouter;