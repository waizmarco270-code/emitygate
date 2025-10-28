
import PageWrapper from "@/components/page-wrapper";
import { projectsData, type Project } from "@/lib/projects-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { placeHolderImages } from "@/lib/placeholder-images";

const ProjectCard = ({ project }: { project: Project }) => {
  const placeHolder = placeHolderImages.find(p => p.id === project.id);
  const Icon = project.icon;

  return (
    <Card className="group overflow-hidden border-primary/20 hover:border-primary/50 transition-all hover:scale-[1.02] shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative w-full h-64">
          <Image
            src={placeHolder?.imageUrl || `https://picsum.photos/seed/${project.id}/600/400`}
            alt={project.name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={placeHolder?.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 flex items-center gap-3">
             <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
             </div>
             <CardTitle className="font-headline tracking-wide text-white text-2xl">{project.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardDescription className="mt-2 h-24">{project.description}</CardDescription>
        <Button variant="outline" className="mt-4 w-full" asChild>
          <Link href={project.url} target="_blank" rel="noopener noreferrer">
            View Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <main className="container mx-auto py-12 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-6xl tracking-wider">Our Initiatives</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            A glimpse into the core projects that define the EmityGate empire and shape the future.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </PageWrapper>
  );
}
