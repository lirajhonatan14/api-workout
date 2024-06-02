const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3000;



const workoutSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    category: String,
    target_muscle_group: [String],  // Alterado para aceitar arrays
    step_by_step_instructions: [String],  // Alterado para aceitar arrays
    tips: String,
    necessary_equipment: String,
    place_to_perform: [String],  // Alterado para aceitar arrays
    difficulty_level: String,
    repetition_duration: [String],  // Alterado para aceitar arrays
    images_url: [String],  // Alterado para aceitar arrays
    videos_url: [String],  // Alterado para aceitar arrays
    benefits: [String],  // Alterado para aceitar arrays
    precautions: [String],  // Alterado para aceitar arrays
    author: String,
    tags: [String]  // Alterado para aceitar arrays
});

const Workout = mongoose.model('Workout', workoutSchema);

app.get('/', async (req, res) => {
    const workouts = await Workout.find()
    return res.send(workouts);
});

app.delete("/:id", async(req, res) => {
    const workout = await Workout.findByIdAndDelete(req.params.id)
    return res.send(workout)
})

app.put("/:id", async(req, res) => {
    const workout = await Workout.findByIdAndUpdate(req.params.id, {
        id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            target_muscle_group: req.body.target_muscle_group,
            step_by_step_instructions: req.body.step_by_step_instructions,
            tips: req.body.tips,
            necessary_equipment: req.body.necessary_equipment,
            place_to_perform: req.body.place_to_perform,
            difficulty_level: req.body.difficulty_level,
            repetition_duration: req.body.repetition_duration,
            images_url: req.body.images_url,
            videos_url: req.body.videos_url,
            benefits: req.body.benefits,
            precautions: req.body.precautions,
            author: req.body.author,
            tags: req.body.tags
    }, {
        new: true
    })

    return res.send(workout)
})

app.post("/", async (req, res) => {
    try {
        const workout = new Workout({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            target_muscle_group: req.body.target_muscle_group,
            step_by_step_instructions: req.body.step_by_step_instructions,
            tips: req.body.tips,
            necessary_equipment: req.body.necessary_equipment,
            place_to_perform: req.body.place_to_perform,
            difficulty_level: req.body.difficulty_level,
            repetition_duration: req.body.repetition_duration,
            images_url: req.body.images_url,
            videos_url: req.body.videos_url,
            benefits: req.body.benefits,
            precautions: req.body.precautions,
            author: req.body.author,
            tags: req.body.tags
        });

        await workout.save();
        return res.send(workout);
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://lirajhonatan14:uCoeCQu9ApXEmXdP@workout-api.ca7xldz.mongodb.net/?retryWrites=true&w=majority&appName=WorkOut-API', {
    useUnifiedTopology: true
    ssl: true, // Habilita SSL
    sslValidate: false, // Se você não quiser validar o certificado SSL (não recomendado para produção)
    useFindAndModify: false, // Se aplicável
    useCreateIndex: true // Se aplicável
  }).then(() => {
    console.log('Connected to MongoDB with SSL');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB with SSL', err);
  })
});
    console.log(`Exemplo de app escutando na porta ${port}`);
});
