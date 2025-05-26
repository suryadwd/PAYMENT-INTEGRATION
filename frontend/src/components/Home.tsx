
const Home = () => {
  return (
    <div className="container mx-auto p-4">
      
      <h1 className="text-3xl font-bold text-center mb-4">
        Welcome to the Payment Integration (Razorpay) MERN Stack Project
      </h1>

      <p className="text-lg mb-4">
        This is the main landing page where we provide all the details about
        the project, its workflow, and the future enhancements. The goal is to
        build a scalable and efficient payment system using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript.
      </p>

       <h2 className="text-2xl font-semibold mb-2">Project Workflow:</h2>
      <ul className="list-disc pl-6 text-lg mb-4">
        <li>
          <strong>Cloud Infrastructure:</strong> Utilizing <strong>AWS EC2</strong> on Ubuntu for hosting all required services.
        </li>
        <li>
          <strong>MERN Stack with TypeScript:</strong> The application is built using MongoDB, Express, React, and Node.js with TypeScript. (JavaScript is not used here.)
        </li>
        <li>
          <strong>Docker Containers:</strong> The frontend and backend services are containerized using Docker. This includes setting up a <strong>multi-stage Docker build</strong> using Docker Compose and pushing the image to <strong>Docker Hub</strong>.
        </li>
        <li>
          <strong>Kubernetes Setup:</strong> Kubernetes (K8s) is used for managing the app in a scalable and efficient manner. This includes:
          <ul className="list-inside">
            <li>Namespaces for isolating different environments.</li>
            <li>Pods for deployment of the app's components.</li>
            <li>Services for networking between pods.</li>
            <li>ConfigMaps and Secrets for managing environment variables securely.</li>
            <li>RBAC (Role-Based Access Control) for restricting permissions. For example, the backend ServiceAccount has limited access to only the necessary Secrets and ConfigMaps.</li>
          </ul>
        </li>
        <li>
          <strong>Horizontal Pod Autoscaling (HPA):</strong> HPA is implemented to control traffic and scale the application automatically based on load.
        </li>
        <li>
          <strong>Ingress:</strong> Customized URLs and subdomains (e.g., for search functionality) are managed through Ingress.
        </li>
      </ul>

        <h2 className="text-2xl font-semibold mb-2">Upcoming Features:</h2>
      <ul className="list-disc pl-6 text-lg mb-4">
        <li><strong>RBAC Enhancements:</strong> More granular RBAC rules for access control.</li>
        <li><strong>CI/CD Pipeline:</strong> Integration of Jenkins or GitHub Actions for continuous integration and deployment.</li>
        <li><strong>Monitoring:</strong> Integration of <strong>Prometheus</strong> and <strong>Grafana</strong> for better observability and metrics collection.</li>
        <li><strong>Infrastructure as Code:</strong> Implementing <strong>Terraform</strong> for automating infrastructure provisioning and management.</li>
      </ul>

      <p className="text-lg">
        The main aim of this project is to provide a secure, scalable, and efficient payment gateway system using the latest DevOps practices and technologies. Stay tuned for more updates!
      </p>

    </div>
  )
}

export default Home
