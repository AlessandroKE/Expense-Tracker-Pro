const mongoose = require('mongoose');

const transactionsSchema = new mongoose.schema({

    /* type: mongoose.Schema.Types.ObjectId: This specifies that the type of user_id is an ObjectId. 
    In MongoDB, ObjectId is a special type used to uniquely identify document */
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
  
      amount: {
        type: Number,
        required: true,
      },
  
      transaction_type: {
        type: String,
        required: true,
        enum: ["income", "expense"],
      },
  
      remarks: {
        type: String,
        required: true,
      },

},
{
    timestamps: true,
}

)

const transactionModel = mongoose.model('transactions', transactionsSchema)

module.exports = transactionModel;