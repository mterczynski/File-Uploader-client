pipeline {
  agent any

  environment {
    DESTINATION = "root@mterczynski.pl:/var/www/fileUploader_v2/client"
  }

  stages {
    stage('Install') {
      steps {
        sh "yarn"
      }
    }

    stage('Build') {
      steps {
        sh "yarn build"
        archiveArtifacts artifacts: 'dist'
        archiveArtifacts artifacts: 'package.json'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          scp -r dist ${DESTINATION}
          exit
        '''
      }
    }
  }
}
