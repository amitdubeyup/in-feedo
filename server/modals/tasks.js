const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Tasks',
  new Schema({
    open_tasks: {
      type: Number,
      default: 0,
    },
    inprogress_tasks: {
      type: Number,
      default: 0,
    },
    completed_tasks: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: function () {
        return Date.now();
      }
    },
    updated_at: {
      type: Date,
      default: function () {
        return Date.now();
      }
    }
  }, {
    timestamps: false,
    collection: 'Tasks',
  })
);