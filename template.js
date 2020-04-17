export default ({markup, css}) => {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Great App</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <style id="jss-server-side">${css}</style>
        <style>
              a{
                text-decoration: none
              }
        </style>
      </head>
      <body style="margin:0">
        <div id="root">${markup}</div>
        <script type="text/javascript" src="/dist/bundle.js"></script>
      </body>
    </html>`
}