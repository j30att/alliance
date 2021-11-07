export class FilesHelper {
  static fileName(req, file, cb) {
    const lastElement = file.originalname.split('.').length
    const ext = file.originalname.split('.')[lastElement-1];
    const originalName = file.originalname.split('.')[0];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const name = `${originalName}-${uniqueSuffix}.${ext}`;
    cb(null, name);
  }

  static destinationPath(req, file, cb) {
    cb(null, process.env.UPLOAD_DIR)
  }
}
