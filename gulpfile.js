const {src, dest, watch} = require('gulp')
const compileSass = require('gulp-sass');


const compile = () =>{
    return src('sass/**/*.sass')
    .pipe(compileSass())
    .pipe(dest( './src/css/'))
}

exports.compile = compile;