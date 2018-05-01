const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],      // Sub-document collection
    yesCount: { type: Number, default: 0 },
    noCount: { type: Number, default: 0 },
    // Use of underscore emphasises foreign key relationship
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,         // Date survey sent
    lastResponded: Date     // Last time any recipient responded
});

// Register schema with mongoose under specific name
mongoose.model('surveys', surveySchema);
