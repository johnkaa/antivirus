import gulp from 'gulp';
import minify from 'gulp-minify';

import { filePaths } from '../config/paths.js';
import { logger } from "../config/logger.js";

const javascript = async (isDev, serverInstance) => {
  return gulp.src(filePaths.src.js)
	  .pipe(minify({
		  ext: {
			  min: '.min.js'
		  }
	  }))
	  .pipe(logger.handleError('JS'))
	  .pipe(gulp.dest(filePaths.build.js))
	  .pipe(serverInstance.stream());
};

export { javascript };
