import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.start;
            },
            message: 'End date must be greater than start date'
        }

    },
    backgroundColor: {
        type: String,
    },
    venue: {
        type: String
    },
    url: {
        type: String
    }
});

export const Event = mongoose.model('Event', eventSchema);

// export default Event;
