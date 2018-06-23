const driver = require('bigchaindb-driver')

// Create a new keypair.
const tetrapak = new driver.Ed25519Keypair()

// Construct a transaction payload
// const tx = driver.Transaction.makeCreateTransaction(
//     // Define the asset to store, in this example it is the current temperature
//     // (in Celsius) for the city of Berlin.
//     { city: 'Berlin, DE', temperature: 22, datetime: new Date().toString() },

//     // Metadata contains information about the transaction itself
//     // (can be `null` if not needed)
//     { what: 'My first BigchainDB transaction' },

//     // A transaction needs an output
//     [ driver.Transaction.makeOutput(
//             driver.Transaction.makeEd25519Condition(alice.publicKey))
//     ],
//     alice.publicKey
// )

// Sign the transaction with private keys
// const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)

// Send the transaction off to BigchainDB
const conn = new driver.Connection('https://test.bigchaindb.com/api/v1/', { 
    app_id: '1007e9ba',
    app_key: '0872595ed0d3b9c29fe1be680895d7ec'
})

// conn.postTransactionCommit(txSigned)
//     .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))

function create_asset(assetid){

  const tx = driver.Transaction.makeCreateTransaction(
      { asset_id: assetid },
      { what: 'Creation of the asset' , time: Date.now(), asset_id: assetid},
      [ driver.Transaction.makeOutput(
              driver.Transaction.makeEd25519Condition(tetrapak.publicKey))
      ],
      tetrapak.publicKey
  )

  // Sign the transaction with private keys
  const txSigned = driver.Transaction.signTransaction(tx, tetrapak.privateKey)

  conn.postTransactionCommit(txSigned)
    // .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
    .then(retrievedTx => {
      console.log('Transaction', retrievedTx, 'successfully posted.')
      assets[assetid] = retrievedTx;
      assets[retrievedTx] = assetid;
  });

}


create_asset(1000);
