pipeline {
    agent any

    environment {
        NODE_VERSION = '26'
        APP_DIR = 'dadjoke-app'
        BACKEND_PORT = '3001'
        FRONTEND_PORT = '3000'
    }

    tools {
        nodejs "${NODE_VERSION}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                dir("${APP_DIR}") {
                    sh 'node --version'
                    sh 'npm run install:all'
                }
            }
        }

        stage('Lint') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm run lint'
                }
            }
        }

        stage('Test') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                dir("${APP_DIR}") {
                    echo 'No compile step required for plain JavaScript app.'
                    sh 'test -f backend/src/server.js'
                    sh 'test -f frontend/public/index.html'
                }
            }
        }

        stage('Package') {
            steps {
                dir("${APP_DIR}") {
                    sh '''
                        mkdir -p dist
                        tar -czf dist/dadjoke-app.tar.gz backend frontend package.json scripts
                    '''
                }
                archiveArtifacts artifacts: "${APP_DIR}/dist/dadjoke-app.tar.gz", fingerprint: true
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                dir("${APP_DIR}") {
                    echo 'Deploying dad joke application...'
                    sh '''
                        # Example deployment: copy artifact and restart services.
                        # Replace with your environment-specific deployment commands.
                        echo "Would deploy to production here"
                    '''
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: "${APP_DIR}/**/test-results.xml"
        }
        success {
            echo 'Dad joke pipeline completed successfully.'
        }
        failure {
            echo 'Dad joke pipeline failed.'
        }
    }
}
